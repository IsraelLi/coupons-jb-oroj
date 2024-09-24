import React from 'react';
import { Button } from 'react-bootstrap';
import './PlusButton.css';

const PlusButton = (props) => {
  return (
    <Button onClick={props.onClick} variant="primary" className="plus-button">
      +
    </Button>
  );
};

export default PlusButton;
