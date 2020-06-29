import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://<usuario>:<senha>@cluster0-dxvwu.mongodb.net/grades?retryWrites=true&w=majority",
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(
    console.log("Conectado ao Mongo DB Atlas")
).catch((err)=>{
    console.log(err);
});

//Criação do modelo
const studentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,        
    },
    subject:{
        type: String,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    lastModified:{
        type: Date,
        default: Date.now
    }
});

//Definindo o modelo da coleção
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');

new student({
    name:'Thiago Borges',
    subject: 'Matemática',
    type:'Trabalho Prático',
    value: 22
}).save()
.then(()=> console.log('Documento inserido'))
.catch((err)=> console.log(err));