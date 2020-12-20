const { assert } = require('chai')

const W3arts = artifacts.require('./W3arts.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('W3arts', ([deployer, creator, buyer]) => {
  let w3arts

  before(async () => {
    w3arts = await W3arts.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await w3arts.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await w3arts.name()
      assert.equal(name, 'W3arts')
    })
  })

  describe('artworks', async () => {
    let result, artworkCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await w3arts.createArtwork(hash, web3.utils.toWei('1', 'Ether'),'Artwork title', 'Artwork description', { from: creator })
      artworkCount = await w3arts.artworkCount()
    })

    //check event
    it('creates artworks', async () => {
      // SUCESS
      assert.equal(artworkCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), artworkCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.price, web3.utils.toWei('1', 'Ether'), 'price is correct' )
      assert.equal(event.title, 'Artwork title', 'title is correct')
      assert.equal(event.description, 'Artwork description', 'description is correct')
      assert.equal(event.owner, creator, 'creator is correct')

      // FAILURE: Artwork must have hash
      await w3arts.createArtwork('', 'Artwork title', 'Artwork description', { from: creator }).should.be.rejected;

      // FAILURE: Artwork must have title
      await w3arts.createArtwork('Artwork hash', '', { from: creator }).should.be.rejected;
    })

    //check from Struct
    it('lists artworks', async () => {
      const artwork = await w3arts.artworks(artworkCount)
      assert.equal(artwork.id.toNumber(), artworkCount.toNumber(), 'id is correct')
      assert.equal(artwork.hash, hash, 'Hash is correct')
      assert.equal(artwork.price, web3.utils.toWei('1', 'Ether'), 'price is correct' )
      assert.equal(artwork.title, 'Artwork title', 'title is correct')
      assert.equal(artwork.description, 'Artwork description', 'description is correct')
      assert.equal(artwork.owner, creator, 'creator is correct')
    })
    it('sells artworks', async () => {
      //Track seller balance before purchase
      let oldCreatorBalance
      oldCreatorBalance = await web3.eth.getBalance(creator)
      oldCreatorBalance = new web3.utils.BN(oldCreatorBalance)
      //SUCCESS Buyer makes purchase
      result = await w3arts.purchaseArtwork(artworkCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})
      //Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), artworkCount.toNumber(), 'id is correst')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.price, web3.utils.toWei('1', 'Ether'), 'price is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct') 

      //Seller receives funds
      let newCreatorBalance
      newCreatorBalance = await web3.eth.getBalance(creator)
      newCreatorBalance = new web3.utils.BN(newCreatorBalance)
      
      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const expectedBalance = oldCreatorBalance.add(price)
      
      assert.equal(newCreatorBalance, expectedBalance.toString())

      //FAILURE: tries to buy a artwork that does not exist i.e artwork must have a valid id
      await w3arts.purchaseArtwork(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
      //FAILURE: Buyer tries to buy without enough ether
      await w3arts.purchaseArtwork(artworkCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
      //FAILURE: Deployer triest to buy the artwork, i.e, artwork can't be purchased twice
      await w3arts.purchaseArtwork(artworkCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
      //FAILURE: Buyer tries to buy again ie buyer can't be the seller
      await w3arts.purchaseArtwork(artworkCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

   })

  })
})