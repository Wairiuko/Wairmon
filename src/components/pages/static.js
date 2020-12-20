import React, {Component} from 'react';
import '../App.css'
class Static extends Component {
    render(){
        return(
            <>
            <br></br>
            <div id="static" className="content mr-auto ml-auto">
                <h1>A decentralized web app for creating all kinds of art</h1>
                <h2>Built on top of the Ethereum Blockchain network</h2>
                <p>W3irds art is a platform where artists who are willing to bend the rules <br></br>
                join in to create rare one-of-a-kind art either collaboratively or individually. <br/>
                </p>
                <h2>Liberating Art through Programming</h2>
                <p>Here art is more than just a png or jpg image file shown on the web. <br/>
                We have given the artists the power to visualize their art the best way they can.<br/>
                And that is by getting rid of all the bottlenecks of traditional/mainstream art platforms.</p>
                <h2>It's All About the Art</h2>
                <p>We focus not so much on the commercialization but on the art creation process.<br/>
                For example we may want to see how an art piece progresses over time, not on the <br/>
                provenance tree as traditional art is always about but on the creation process itself.<br/>
                We want to answer when, how, what, who questions; and in that way have a greater scope <br/>
                and better understanding and appreciation of the art in question.</p>
                <h2>Leave A Tip if You Feel You have to</h2>
                <p>The real power of art is found in its ability to move us emotionally.<br></br>
                While it may not be the same for everyone, the aesthetics reached in each piece<br/>
                alone is invaluable. We give you the liberty to show your appreciation by either giving a tip<br/>
                to the creators, sharing the work or better yet sponsoring the continuity of the creation.<br/>
                If and when the creation reaches its maturity level, the creators choose whether or not to put<br/>
                it up for sale. Either way, all history is stored immutably in the blockchain including tips, <br/>
                and donations. This is a great way to sponsor worth causes in the art world.</p>
            </div>
            </>
        )
    } 
}
export default Static;