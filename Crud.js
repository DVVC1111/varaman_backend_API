const { request, response } = require("express")
const { Pool } = require("pg")


const pool = new Pool({
    user: 'root',
    host: 'varamanbackend.comruqr8hn6j.us-east-1.rds.amazonaws.com',
    database: 'varamanbackend',
    password: 'root2002',
    port: 5432,

});

const regNums = (request,response) =>{ 
    const{phonenumber, ownerid, datesold, currentbalance,simtype}= request.body
    pool.query("INSERT INTO public.numberdb(phonenumber, ownerid, datesold, currentbalance, simtype) VALUES ($1, $2, $3, $4, $5) RETURNING *",[phonenumber, ownerid, datesold, currentbalance, simtype],(error,result)=>{
      if(error){
        throw error
        
        
      }
      response.status(201).send(`Number registered complete`)
    })
};

const createUser = (request, response) => {
    const {firstname,lastname,nationality,age,gender,dob,user_identification} = request.body
    pool.query('INSERT INTO userinfo (firstname,lastname,nationality,age,gender,dob,user_identification) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',[firstname,lastname,nationality,age,gender,dob,user_identification],(error, results)=>{
      if(error){
          throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].firstname}`)
    })
    
}

const topUp =(request,response)=>{
    // const phonenumber = parseInt(request.params.phonenumber)
    const {addbalance, phonenumber} = request.body
    pool.query('UPDATE numberDb SET "currentbalance" = $1 WHERE phonenumber=$2',[addbalance,phonenumber], (error , result)=> {
      if(error){
          throw error
      }
      response.status(200).send(`Top up successful`)
    })
  }

module.exports = {
    createUser,
    regNums,
    topUp
}

