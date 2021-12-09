import React from 'react';
import '../App.css';
import photoOne from "../aboutPhotos/akuta1.jpg"
import photoTwo from "../aboutPhotos/akuta2.jpg"
import photoThree from "../aboutPhotos/akuta3.jpg"

export default function About() {
    

    return (

        <div className="About">
            <div className="winnersDisp">
                <h1>龍之介芥川</h1>
                <div className="aboutPicBox">
                    <img alt="Loading..." src={photoOne} className="aboutPic"/>
                    <img alt="Loading..." src={photoTwo} className="aboutPic"/>
                    <img alt="Loading..." src={photoThree} className="aboutPic"/>
                </div>
                <div className="flex">
                    <p >
                        誕生：1892年３月１日 <br/>
                        死没：1927年７月24日 <br/>
                    </p>    
                        <ul className="slRight">
                            代表作：
                            <li>『羅生門』</li>
                            <li>『鼻』</li>
                            <li>『地獄変』</li>
                            <li>『河童』</li>
                            <li>『歯車』</li>

                        </ul>
                    
                </div>
                
            </div>
            
            <div>
                <h2>芥川賞</h2>
                <p>芥川龍之介賞（あくたがわりゅうのすけしょう）、通称芥川賞は、純文学の新人に与えられる文学賞である。文藝春秋社内の日本文学振興会によって選考が行われ、賞が授与される</p>

            </div>
                
        </div>
    )
}