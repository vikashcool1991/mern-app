import React, { Component } from "react";
import { MdMessage, MdCached, MdMoreVert, MdSearch, MdMic, MdSend, MdSentimentVerySatisfied } from 'react-icons/md';
import './style.css';

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chat_box">
                <div className="users_list">
                    <div className="item1">
                        <div className="item11">
                            <div><a><MdCached /></a></div>
                        </div>
                        <div></div>
                        <div className="item12">
                            <div><a><MdCached /></a></div>
                            <div><a><MdMessage /></a></div>
                            <div><a><MdMoreVert /></a></div>
                        </div>
                    </div>
                    <div className="item2">
                        <div className="item21">
                            <MdSearch className="mdsearch" />
                            <input className="searchbox" placeholder='search here' type='text'/>
                        </div>
                    </div>
                    <div className="item3">
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                        <div className="item31">
                            <div className="item311"><a><MdCached /></a></div>
                            <div className="item312">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                            <div className="item313 time text-muted small">13:21</div>
                        </div>
                    </div>
                </div>
                {/* <div><div className="chatDivider"></div></div> */}
                <div className="msgs">
                    <div className="item4">
                        <div className="item41">
                            <div className="item411"><a><MdCached /></a></div>
                            <div className="item412">
                                <h6>Richard</h6>
                                <p className="text-muted">I'm not sure...</p>
                            </div>
                        </div>
                        <div className="item42">
                            <div><a><MdCached /></a></div>
                            <div><a><MdMessage /></a></div>
                            <div><a><MdMoreVert /></a></div>
                        </div>
                    </div>
                    <div className="item5">
                        <div className="bubble-right">
                        <div className="box3 sb13">
                            Hello dude!
                        </div>
                        </div>
                        <div className="bubble-left">
                        <div className="box3 sb14">
                            Hello dude!
                        </div>
                        </div>
                        <div className="bubble-right">
                        <div className="box3 sb13">
                            Hello dude!
                        </div>
                        </div>
                        <div className="bubble-left">
                        <div className="box3 sb14">
                            Hello dude!
                        </div>
                        </div>
                        <div className="bubble-right">
                        <div className="box3 sb13">
                            Hello dude!
                        </div>
                        </div>
                        <div className="bubble-right">
                        <div className="box3 sb13">
                            Hello dude!
                        </div>
                        </div>
                        <div className="bubble-left">
                        <div className="box3 sb14">
                            Hello dude!
                        </div>
                        </div>
                    </div>
                    <div className="item6">
                        <div className="item61">
                            <div><a><MdSentimentVerySatisfied /></a></div>
                            <div className="msgBox"><input className="searchbox" type="text" placeholder="Type your message here" /></div>
                            <div><a><MdMic /></a></div>
                            <div><a><MdSend /></a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;