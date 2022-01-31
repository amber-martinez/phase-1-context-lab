let person = {
    name: 'amber',
    loc: 'san francisco',
    whoami: function() {
        console.log(this)
    }
}

person.whoami()