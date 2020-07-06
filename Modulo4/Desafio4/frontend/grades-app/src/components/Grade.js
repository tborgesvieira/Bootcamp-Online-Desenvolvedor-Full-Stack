import React, { useState, useEffect } from 'react';
import GradeDataService from '../services/GradeService';

const Grade = (props) => {
  const initialGradeState = {
    id: null,
    name: '',
    subject: '',
    type: '',
    value: '',
  };
  const [currentGrade, setCurrentGrade] = useState(initialGradeState);
  const [message, setMessage] = useState('');

  const getGrade = (id) => {
    GradeDataService.get(id)
      .then((response) => {
        setCurrentGrade(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getGrade(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentGrade({ ...currentGrade, [name]: value });
  };

  const updateGrade = () => {
    GradeDataService.update(currentGrade.id, currentGrade)
      .then((response) => {
        setMessage('The grade was updated successfully!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteGrade = () => {
    GradeDataService.remove(currentGrade.id)
      .then((response) => {
        props.history.push('/grade');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentGrade ? (
        <div className="edit-form">
          <h4>Grade</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentGrade.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={currentGrade.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                value={currentGrade.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                className="form-control"
                id="value"
                name="value"
                value={currentGrade.value}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteGrade}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateGrade}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Grade...</p>
        </div>
      )}
    </div>
  );
};

export default Grade;
