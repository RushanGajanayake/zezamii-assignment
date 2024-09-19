
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const nameRegex = /^[a-zA-Z\s]+$/;

module.exports = {
    nameValidation : function (name) {
        if (!name || name.length > 50) return false;

        if (!nameRegex.test(name)) return false;

        return true;
    },
    emailValidation : function (email) {
        if (!email || email.length > 254) return false;

        if (!emailRegex.test(email)) return false;
    
        const parts = email.split("@");
        if (parts[0].length > 64) return false;
    
        const domainParts = parts[1].split(".");
        if (domainParts.some(part => part.length > 63)) return false;
    
        return true;
    }

}

