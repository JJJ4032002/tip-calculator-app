(function MainLogic() {
  const tipBtns = document.body.querySelectorAll(".grid-items");
  const peopleInput = document.body.querySelector("#people");
  const billInput = document.body.querySelector("#bill");
  const customInput = document.body.querySelector("#btnInput");
  const rstBtn = document.body.querySelector(".resBtn");
  let TipText = document.body.querySelector("#TipResText");
  let BillText = document.body.querySelector("#BillResText");

  let TipBtnsArr = [...tipBtns];

  customInput.addEventListener("click", checkForCustom);

  TipBtnsArr.forEach(function (e) {
    e.addEventListener("click", CheckWhichTip);
  });

  rstBtn.addEventListener("click", reset);
  function reset() {
    TipText.textContent = "$0.00";
    BillText.textContent = "$0.00";
    billInput.value = "";
    peopleInput.value = "";
  }

  function checkForCustom(e) {
    const val = CheckIfInputsAreValid(e);
    if (val === undefined) {
      console.log("Nothing has been returned");
    } else {
      CalcResult(val.billres, val.peopleRes, val.result);
    }
  }

  function CheckWhichTip(e) {
    const val = CheckIfInputsAreValid(e);
    if (val === undefined) {
      console.log("Nothing has been added yet");
    } else {
      let strArr = [...val.result];

      strArr = strArr.filter(function (e) {
        return e != "%";
      });
      strArr = strArr.join("");
      console.log(strArr);
      CalcResult(val.billres, val.peopleRes, strArr);
    }
  }

  function CalcResult(bill, people, tipPercent) {
    let billPerPerson = bill / people;
    billPerPerson = billPerPerson.toFixed(2);
    let TipTotal = (Number(tipPercent) / 100) * bill;
    TipTotal = TipTotal.toFixed(2);

    let tipPerPerson = Number(TipTotal) / 5;
    tipPerPerson = tipPerPerson.toFixed(2);
    let newBillPerPerson = Number(billPerPerson) + Number(tipPerPerson);
    newBillPerPerson = newBillPerPerson.toFixed(2);

    TipText.textContent = "";
    BillText.textContent = "";
    TipText.textContent = `$${tipPerPerson}`;
    BillText.textContent = `$${newBillPerPerson}`;
  }

  function CheckIfInputsAreValid(e) {
    const billres = billInput.value;
    const peopleRes = peopleInput.value;
    if (e.target.id === "btnInput" && e.target.value === "") {
      console.log("Nothing has been added yet");
    } else if (peopleInput.value === "0") {
      alert("Number of people can't be zero");
    } else if (peopleInput.value === "" || billInput.value === "") {
      alert("Bill and Number of people can't remain empty");
    } else {
      if (e.target.id === "btnInput") {
        const result = e.target.value;
        return { result, billres, peopleRes };
      } else {
        const result = e.target.textContent;

        return { result, billres, peopleRes };
      }
    }
  }
})();
