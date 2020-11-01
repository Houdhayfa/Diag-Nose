const path=require('path')
const DataParser=require('datauri/parser')
const parser=new DataParser()



const bufferTo64Converter = file =>{
 return parser.format(path.extname(file.originalname),file.buffer)
}
module.exports={bufferTo64Converter}