import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dType: 'rows',
      noOfRows: 0,
      noOfColumns: 5,
      nodesInColumns: [1, 2]
    }
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleArrayChange = (idx, value) => {
    console.log(idx, value)

  }

  addColumn = (ev)=>{
    ev.preventDefault()
    this.setState((prevState)=>{
      console.log(prevState)
      const lastColumnNodes = prevState.nodesInColumns[prevState.nodesInColumns.length -1]
      return{
        nodesInColumns : [...prevState.nodesInColumns,lastColumnNodes*2]
      }
    })
  }

  render() {
    const { dType, noOfRows, noOfColumns, nodesInColumns } = this.state;
    // let columnsTemplate = []
    // for (let i = 0; i < noOfColumns; i++) {
    //   columnsTemplate.push(
    // <div className="form-group">
    //   <label>columns {i + 1}</label>
    //   <input className="form-control form-control-sm" value={nodesInColumns[i]} name="noOfRows" onChange={((ev)=>this.handleArrayChange(i,ev.target.value))} type="number" />
    // </div>
    //   )
    // }
    const columnsTemplate = nodesInColumns.map((nodesInColumn, index) => (
      <div className="form-group">
        <label>columns {index + 1}</label>
        <input className="form-control form-control-sm" value={nodesInColumn} name="noOfRows" onChange={((ev) => this.handleArrayChange(index, ev.target.value))} type="number" />
      </div>
    ))

    return (
      <div className="App">
        <div className="container">
          <header>
            <h3>
              PowerBI Data Geneartor
        </h3>
          </header>
          <form>
            <div className="form-group">
              <label>Data type</label>
              <select onChange={this.handleChange} value={dType} name="dType" className="form-control form-control-sm">
                <option value="rows" >No. of Rows</option>
                <option value="columns" >No. of nodes in columns</option>
              </select>
            </div>

            {
              dType === 'rows' ?
                <div>
                  <div className="form-group">
                    <label>No.of Rows</label>
                    <input className="form-control form-control-sm" value={noOfRows} name="noOfRows" onChange={this.handleChange} type="number" />
                  </div>
                </div> :
                <>
                  {/* <div>
                    <label>No.of Columns</label>
                    <select onChange={this.handleChange} value={noOfColumns} name="noOfColumns" className="form-control form-control-sm">
                      <option value="2" >2</option>
                      <option value="3">3</option>
                      <option value="4" >4</option>
                      <option value="5" >5</option>
                    </select>
                  </div> */}
                  <div>
                    <label>
                  No.of columns &nbsp;
                  {nodesInColumns.length}
                    </label>
                  </div>
                  <button onClick={this.addColumn} className="btn btn-success">Add Column</button>

                  {columnsTemplate}

                </>
            }
            <button className="btn btn-primary">Generate</button>


          </form>
        </div>
      </div>
    )
  }
}

export default App;
