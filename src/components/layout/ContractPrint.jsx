import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { Contract } from './Contract';

class ContractPrint extends React.PureComponent {

  getPageMargins = () => {
    return `@page { margin: 30px !important; }`;
  };

  render() {
    return (
      <div >
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer >
            {({ handlePrint }) => (
              <div className="text-center" >
                <button className='hover-button my-4' onClick={handlePrint}>Drukuj</button>
              </div>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <Contract ref={el => (this.componentRef = el)} />
        <style>{this.getPageMargins()}</style>
      </div>
    );
  }
}

export default ContractPrint