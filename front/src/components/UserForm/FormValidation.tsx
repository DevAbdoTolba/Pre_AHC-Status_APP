/***********************************************/
/*____________Form Validation Functions___________/
/***********************************************/

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




export { hasSpecialCharacters };
export { isUserNameVeryBig };
export { isMessageBig };
