import React from 'react'
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {

    const tableGrades = [];

    let currentStudent = grades[0].student;
    let currentSubject = grades[0].subject;
    let currentGrades = [];
    let id = 1;

    grades.forEach((grade) => {
        if (grade.subject !== currentSubject) {
            tableGrades.push({
                id: id++,
                student: currentStudent,
                grades: currentGrades,
                subject: currentSubject
            });

            currentSubject = grade.subject;
            currentGrades = [];
        }

        if (grade.student !== currentStudent) {
            currentStudent = grade.student;
        }

        currentGrades.push(grade);
    });

    tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
    })

    const handleActionClick = (id, type) =>{
        const grade = grades.find(grade => grade.id === id);

        if(type === 'delete'){
            onDelete(grade);
            return;
        }

        onPersist(grade);
    }

    return (
        <div className='center'>
            {tableGrades.map(({id, grades}) => {

                const finalGrades = grades.reduce((acc, cur)=> acc + cur.value, 0);

                const gradeStyle = finalGrades >= 70 ? styles.goodGrade : styles.badGrade;

                return (
                    <table style={styles.table} className='striped center' key={id}>
                        <thead>
                            <tr>
                                <th style={{width: '20%'}}>Aluno</th>
                                <th style={{width: '20%'}}>Disciplina</th>
                                <th style={{width: '20%'}}>Avaliação</th>
                                <th style={{width: '20%'}}>Nota</th>
                                <th style={{width: '20%'}}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map(({ id, subject, student, type, value, isDeleted }) => {
                                return (<tr key={id}>
                                    <td>{student}</td>
                                    <td>{subject}</td>
                                    <td>{type}</td>
                                    <td>{isDeleted ? '-' : value}</td>
                                    <td>
                                        <Action onActionClick={handleActionClick} id={id} type= {isDeleted? "add" : "edit"} />
                                        {!isDeleted && <Action onActionClick={handleActionClick} id={id} type= "delete" /> }
                                    </td>
                                </tr>);
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td style={{textAlign: 'right', fontWeight: 'bold'}} >Total</td>
                                <td style={gradeStyle}>{finalGrades}</td>
                            </tr>
                        </tfoot>
                    </table>
                )
            })}
        </div>
    )
}

const styles = {
    goodGrade:{
        fontWeight: 'bold',
        color: 'green'
    },
    badGrade:{
        fontWeight: 'bold',
        color: 'red'
    },
    table:{
        margin: '20px',
        padding: '10px'
    }
}