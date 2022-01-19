//BANK
//
//
let balance = document.querySelector("#balance") //p-tag in bank-div
let outstandingLoan = document.querySelector("#outstanding-loan") //p-tag for loan in bank-div

//bound to onclick event on "Get a loan"-button
function getALoan(){
    let loanLimit = parseInt(balance.innerText) * 2   //temp variable to check how much you are able to loan
    let loan = parseInt(prompt())
    //fixes error with cancelbutton on prompt
    if(!loan){                
        outstandingLoan.innerText = "0"
        balance.innerText = "0"
    }//compares the prompt amount against your balance amount times two
    else if(loan > loanLimit){
        alert("Your loan can only be double of balance")}
    //checks if you already have a loan
    else if(parseInt(outstandingLoan.innerText) === 0){
        outstandingLoan.innerText = loan
        balance.innerText = loan + parseInt(balance.innerText)
        loanButton.removeAttribute("hidden", "hidden")
    } 
    else{
        alert("You can only have one outstanding loan at a time")
    } 
}
//
//WORK
//
//
let pay = document.querySelector("#pay")    //p-tag in workdiv
let loanButton = document.querySelector("#repay-loan-btn")  //need variable in order to hide dynamically
if(parseInt(outstandingLoan.innerText) === 0){  //hides repayloanbutton from start and shows when loan is more than zero
    loanButton.setAttribute("hidden", "hidden")
}else{
    loanButton.removeAttribute("hidden", "hidden")
}
//incremental work to fill pay
function work(){
    let work = 100
    pay.innerText = parseInt(pay.innerText) + work
}
//empties pay and places full amount in balance
function transferToBank(){
    balance.innerText = parseInt(balance.innerText) + parseInt(pay.innerText)
    pay.innerText = "0"
}

function repayLoan(){
    let loanPayment = parseInt(pay.innerText)
    if(parseInt(pay.innerText) > parseInt(outstandingLoan.innerText)){
        let remainder = loanPayment - parseInt(outstandingLoan.innerText)
        loanPayment = loanPayment - remainder
        console.log(loanPayment)
        console.log(remainder)
        balance.innerText = parseInt(balance.innerText) + remainder
        pay.innerText = "0"
        outstandingLoan.innerText = "0"
    }
    else{
        outstandingLoan.innerText = parseInt(outstandingLoan.innerText) - loanPayment
        pay.innerText = "0"
    if(parseInt(outstandingLoan.innerText) === 0){
            loanButton.setAttribute("hidden", "hidden")
        }
    }
    
}
//
//LAPTOPSECTION
//
//
const laptops = []  //gets filled with json objects after fetch
const laptopList = document.querySelector("#laptop-list") //select element
const laptopInfoList = document.querySelector("#laptop-info-list") //ul that shows info on laptops
const imageDisplay = document.querySelector("#image-display")   //img tag
const baseUrl = "https://noroff-komputer-store-api.herokuapp.com/" //so that strings can be added

fetch("https://noroff-komputer-store-api.herokuapp.com/computers").then
(function(result){
    return result.json()
})
.then(function(fetchedLaptops){
    for(laptop of fetchedLaptops){
    laptops.push(laptop)
    let option = document.createElement("option")
    option.innerText = laptop.title
    laptopList.appendChild(option)
    }
})
//binds to change event on select element
function getSelectedValue(val) {
    const selectedLaptop = laptops.find((laptop) => laptop.title === val )
    laptopInfoList.innerHTML = `<li>${selectedLaptop.description}</li><br>
    <li>Price: ${selectedLaptop.price}kr</li><br>
    <li>${selectedLaptop.specs}</li>`
    if(selectedLaptop.id === 5){
        imageDisplay.setAttribute("src", baseUrl + selectedLaptop.image.replace(".jpg", ".png"))
    }else{
        imageDisplay.setAttribute("src", baseUrl + selectedLaptop.image)
    }
}
//checks that you can afford the currently showing laptop
function buyLaptop(){
    const selectedLaptop = laptops.find((laptop) => laptop.title === laptopList.value )
    if(parseInt(selectedLaptop.price) > parseInt(balance.innerText)){
        alert("You don't have enough funds")
    }else{
        alert("You've bought:" + selectedLaptop.title)
        balance.innerText = parseInt(balance.innerText) - parseInt(selectedLaptop.price)
        
    } 
}