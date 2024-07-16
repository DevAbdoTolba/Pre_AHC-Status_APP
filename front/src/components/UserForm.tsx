import React, { useState } from 'react';
import { Control, FieldErrors, FormState, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type FormValues = {
       username: string,
       birthDate: Date,
       level: string,
       message: string
};

const UserForm: React.FC = () => {

       
const { handleSubmit, register, formState } = useForm<FormValues>();
const { errors } = formState;
  
// Important validation function
function hasSpecialCharacters(input: string): string | boolean {
       return (/^[A-Za-z\u0600-\u06FF\s]+$/.test(input)
              || "special characters and digits not allowed");
}

function isUserNameVeryBig(input: string): string | boolean {
      return (input.length < 50 || "Your Name is very Big");
}


function isMessageBig(input: string): string | boolean {
      return (input.length < 200 || "Message is very Big");
}



       // Handle submit 
       function onSubmit(data: FormValues) {
              saveUserData(data);  
       }
       // Uset Name Register validation
       function NameRegister():object
       {
              return {
               ...register('username',{
                     required: "UserName is Required",
                     validate: {
                            NoBigMsg: (input) => isUserNameVeryBig(input),
                            NoSpecialLetters: (input) => hasSpecialCharacters(input),
                            }
               }
               )
               };
       }
       // Date register Validation
       function DateRegister():object
       {
              return {...register('birthDate' ,{valueAsDate:true ,  required: "Date is Required"})}
       }
       // Difficulty register Validation
       function DifficultyRegister():object
       {
              return {...register('level' ,{required:"Difficulty  field is require" , validate:{NotEmpty:(input)=> input!=="" || "Difficulty field is require"}})};
       }
       //  message register Validation
       function MessageRegister():object
       {
              return {...register('message' ,{required:"message field is require" , validate:{NoBigMsg:(input)=>isMessageBig(input) , NoSpecialLetters: (input) => hasSpecialCharacters(input)}})};
       }
// Send Data to the server
   const saveUserData = async (formData: FormValues) => {
    try {
      const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
 

      

 return (<>
               <form onSubmit={handleSubmit(onSubmit)} >
                     {/* Name Input Field */}
                     <input required  type='text' id='name' placeholder='Name' {...NameRegister()} />
                     <p>{ errors.username?.message}</p>
                     {/* BithDate Input Field */}
                     <input required id='date' type='date' {...DateRegister()} />
                      <p >{errors.birthDate?.message}</p>
                     {/* Difficulty Level */}
                     <select required  {...DifficultyRegister()}>
                            <option value="" disabled selected>Level</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                     </select>
                      <p >{errors.level?.message}</p>
                     {/* Main Message */}
                     <textarea required placeholder='Message' id='confirm' {...MessageRegister()} /> 
                     <p>{errors.message?.message}</p>
                     {/* ------------------------------------- */}
                     <button className="btn my-4" >Submit</button>
              </form >         
       </>
       );
};

export default UserForm;
