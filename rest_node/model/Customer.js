class Customer {
    constructor(firstName, lastName, address, phoneNo, creditCardNo, userName, password) {
        this.First_Name = firstName?? null;
        this.Last_Name = lastName ?? null;
        this.Address = address ?? null;
        this.Phone_No = phoneNo ?? null;
        this.Credit_Card_No = creditCardNo ?? null;
        this.User_Name = userName ?? null;
        this.Password = password ?? null;
    }
}

module.exports = { Customer }