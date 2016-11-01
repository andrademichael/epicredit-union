//business logic

var Account = function(name, balance) {
  this.name = name;
  this.balance = balance;
  this.history = [balance];
};

Account.prototype.withdraw = function(amount) {
  this.balance = this.balance - amount;
  this.history.unshift(this.balance);
};

Account.prototype.deposit = function(amount) {
  this.balance = this.balance + amount;
  this.history.unshift(this.balance);
};


//UI logic
$(document).ready(function(){
  $("form#registrationForm").submit(function(event){
    event.preventDefault();
    var nameInput = $("input#name").val();
    var initialDepositInput = parseInt($("input#initialDeposit").val());
    var userAccount = new Account(nameInput, initialDepositInput);
    console.log(userAccount);


    $(".btn#transact").click(function(){
      var withdrawalInput = parseInt($("input#withdrawal").val());
      var depositInput = parseInt($("input#deposit").val());
      var transactionTypeInput = $("input:radio[name=transactionType]:checked").val();
      var amountInput = parseInt($("input#transactionAmount").val());

      if (transactionTypeInput === "withdrawal") {
        userAccount.withdraw(amountInput);
      } else {
        userAccount.deposit(amountInput);
      }
      console.log(userAccount);

    });//end of click function

  });//end of submit function
});//end of document ready
