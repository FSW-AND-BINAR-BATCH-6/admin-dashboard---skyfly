export type Transaction = {
    id: String;
    orderId: String;
    totalPrice: Number;
    status: String;
    userId: String;
    bookingDate: String;
    tax: Number
}

export type Transaction_Detail = {
    id: String;
    transactionId: String;
    price: Number;
    name: String;
    familyName: String;
    dob: String;
    citizenship: String;
    passport: String;
    issuingCountry: String;
    validityPeriod: String;
    flightId: String;
    seatId: String;
    type: String;
}