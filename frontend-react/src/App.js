import React from 'react';
import './App.css';
import { Button, Form, Input } from "reactstrap";
import Cookies from 'js-cookie'

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        details_list:{
            name:'',
            email:'',
            mobile_no:'',
            city:'',
            state:'',
            current_role:'',
            years_of_exp:'',
            current_company:'',
            current_ctc:'',
            expected_ctc:'',
            notice_period:'',
            application_status:'Applied',
        },
        display_data : [],
        display_single_candidate:[],
        change_status:{
            change_status_app:'',
            change_status_app_id:null,
        }
    }
      
    this.handleChange = this.handleChange.bind(this)
    this.PostCandiateDetails = this.PostCandiateDetails.bind(this)
    this.postchangestatus = this.postchangestatus.bind(this)  
  };

componentWillMount(){
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/candidate_details/')
    .then(response => response.json())
    .then(data=>this.setState({ display_data:  data}))
}

fetchSingleCandidate(id){
    this.setState({
      display_single_candidate:  this.state.display_data[id-1]
    })
}

handleChange(e){
    this.setState({
      details_list:{ 
        ...this.state.details_list, 
        [e.target.name]: e.target.value 
      }
    });
}

PostCandiateDetails(e){
    e.preventDefault()

    var csrftoken = Cookies.get('csrftoken');

    var url = 'http://127.0.0.1:8000/api/candidate_details/'

    console.log(this.state.details_list)
    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken, 
      },
      body:JSON.stringify(this.state.details_list)
    }).then((response)  => {
        this.componentWillMount()

})
}


clearform(){
  this.setState({
        details_list:{
            name:'',
            email:'',
            mobile_no:'',
            city:'',
            state:'',
            current_role:'',
            years_of_exp:'',
            current_company:'',
            current_ctc:'',
            expected_ctc:'',
            notice_period:'',
            application_status:'Applied',
      }
 })
}


change_status_id(id){
  this.setState(
    {change_status:{ 
        ...this.state.change_status, 
        change_status_app_id: id 
      }
    }
  )
}


postchangestatus(e){
  e.preventDefault();

  var csrftoken = Cookies.get('csrftoken');
  console.log(this.state.change_status.change_status_app)
  var url = 'http://127.0.0.1:8000/api/change_application_status/';

  fetch(url, {
    method:'POST',
    headers:{
      'Content-type':'application/json',
      'X-CSRFToken':csrftoken, 
    },
    body:JSON.stringify(this.state.change_status)
  }).then((response)  => {
      this.componentWillMount()
})}


render(){
  var candidate_data = this.state.display_data;
  var candidate_single_data = this.state.display_single_candidate;
  return (
    <div className="">
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Candidate Dashboard</h2>
                </div>
                <div className="col-sm-6">
                  <a href="#addCandidate" className="btn btn-primary" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add Candidate</span></a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Current Role</th>
                  <th>Current Company</th>
                  <th>Application Status</th>
                </tr>
              </thead>
              <tbody>
              {candidate_data.map(each_candidate => (
                <tr>
                  <td>{each_candidate.id}</td>
                  <td><a href="#viewCandidateDetails" onClick={() => this.fetchSingleCandidate(each_candidate.id)} className="edit" data-toggle="modal">{each_candidate.name}</a></td>
                  <td>{each_candidate.email}</td>
                  <td>{each_candidate.city}</td>
                  <td>{each_candidate.current_role}</td>
                  <td>{each_candidate.current_company}</td>
                  <td>{each_candidate.application_status} <a href="#changeApplicationStatus" onClick={() => this.change_status_id(each_candidate.id)} class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a></td>
                </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div id="addCandidate" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <Form onSubmit={this.PostCandiateDetails}>
              <div className="modal-header">
                <h4 className="modal-title">Add Candidate</h4>
                <Button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</Button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="name"  value={this.state.details_list.name} required/>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Input onChange={this.handleChange} type="email" className="form-control" name="email" value={this.state.details_list.email} required/>
                </div>

                <div className="form-group">
                  <label>Mobile No</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="mobile_no" value={this.state.details_list.mobile_no} required/>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="city" value={this.state.details_list.city} required/>
                </div>
   
                <div className="form-group">
                  <label>State</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="state" value={this.state.details_list.state} required/>
                </div>

                <div className="form-group">
                  <label>Current Role</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="current_role" value={this.state.details_list.current_role} required/>
                </div>

                <div className="form-group">
                  <label>Years of Experience</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="years_of_exp" value={this.state.details_list.years_of_exp} required/>
                </div>

                <div className="form-group">
                  <label>Current Company</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="current_company"value={this.state.details_list.current_company}  required/>
                </div>

                <div className="form-group">
                  <label>Current CTC</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="current_ctc" value={this.state.details_list.current_ctc} required/>
                </div>

                <div className="form-group">
                  <label>Expected CTC</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="expected_ctc" value={this.state.details_list.expected_ctc} required/>
                </div>

                <div className="form-group">
                  <label>Notice Period</label>
                  <Input onChange={this.handleChange} type="text" className="form-control" name="notice_period" value={this.state.details_list.notice_period} required/>
                </div>
                <div className="form-group">
                  <label>Application Status</label>
                  <Input type="text" className="form-control" name="application_status" value="Applied" readonly/>
                </div>
              </div>
              <div className="modal-footer">
                <Input type="button" onClick={() => this.clearform()} className="btn btn-default" data-dismiss="modal"  value="Cancel"/>
                <Input type="submit" className="btn btn-success" value="Add"/>
              </div>
            </Form>
          </div>
        </div>
      </div>
    
      <div id="viewCandidateDetails" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <Form >
              <div className="modal-header">
                <h4 className="modal-title">Candidate Details</h4>
                <Button type="button"  className="close" data-dismiss="modal" aria-hidden="true">&times;</Button>
              </div>
                <div class="col-lg-15">
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Name:</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.name}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Email</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.email}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Mobile no</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.mobile_no}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">City</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.city}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">State</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.state}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Current Role:</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.current_role}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Experience(in years)</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.years_of_exp}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Current Company</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.current_company}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Current CTC</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.current_ctc}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Expected CTC</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.expected_ctc}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Notice Period</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.notice_period}</p>
                        </div>
                      </div>
                      <hr/>
                      <div class="row">
                        <div class="col-sm-4">
                          <p class="mb-0">Application Status</p>
                        </div>
                        <div class="col-sm-6">
                          <p class="text-muted mb-0">{candidate_single_data.application_status}</p>
                        </div>
                      </div>
                                        
                    </div>
                  </div>
                </div>
              <div className="modal-footer">
                <Input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <div id="changeApplicationStatus" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <Form onSubmit={this.postchangestatus}>
              <div className="modal-header">
                <h4 className="modal-title">Application Status</h4>
                <Button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</Button>
              </div>
              <div className="modal-body">
                <select class="form-select" onChange={(e) => this.setState({change_status:{ ...this.state.change_status, change_status_app: e.target.value }})} name="change_application_status" aria-label="Default select example">
                  <option value="" selected>Select</option>
                   <option value="Accepted">Accepted</option>
                   <option value="Rejected">Rejected</option>
               </select>
              </div>
              <div className="modal-footer">
                <Input type="button"  className="btn btn-default" data-dismiss="modal"  value="Cancel"/>
                <Input type="submit" className="btn btn-success" value="Add"/>
              </div>
            </Form>
          </div>
        </div>
      </div>

    </div>
  )
}
}

export default App;
