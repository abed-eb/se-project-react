import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './card.css'
class CardBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}; 

    }
    render() { 
        return ( 
            <div>

                <Card style={{ width: '20rem' }}>
                        <div className="card-img d-flex justify-content-center">
                            <Card.Img variant="top" src={this.props.img} />
                        </div>
                        <div>
                            <Card.Body>
                                {/* <Card.Title></Card.Title> */}
                                <Card.Text>
                                    {this.props.text}
                                </Card.Text>
                                <Button variant="primary">{this.props.title}</Button>
                            </Card.Body>
                        </div>
                    </Card>

            </div>
         );
    }
}
 
export default CardBox;