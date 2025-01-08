const Base_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const  btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
// for(code in countryList){
//     console.log(code,countryList[code])
// }



for(let select of dropdowns){
    for(currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
       }
       else if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
       }
       
       select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
//to change the flag
const updateFlag =(element)=>{
  let  currCode = element.value;
  let countryCode = countryList[currCode];
 
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img =element.parentElement.querySelector("img");
  img.src = newSrc;
};
//tto change the currency
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";


    }

    // console.log(fromCurr.value,toCurr.value)
    const URL =`${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await  fetch(URL);
    // console.log(response);
    let data = await response.json();
    // let rate = data[fromCurr[toCurr]];
    // console.log(data);
    // console.log(fromCurr.value.toLowerCase())
    // console.log(toCurr.value.toLowerCase())
    // console.log(data[fromCurr.value.toLowerCase()])
    let rate = data[fromCurr.value.toLowerCase()];
    // console.log(rate)
    // console.log(rate[`${toCurr.value.toLowerCase()}`])
    let get=rate[`${toCurr.value.toLowerCase()}`]
    console.log(get)
    
    let final = amtVal*get;
    console.log(final)
    const to=document.querySelector(".get input")
    to.value=final;
});

