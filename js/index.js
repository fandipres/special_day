let x;
let date, month;
let year = new Date().getFullYear();

let el_choosen_date = document.getElementById("choosen_date");
let el_countdown = document.getElementById("countdown");
let el_dec = document.getElementById("dec");
let el_event = document.getElementById("event");
let el_inc = document.getElementById("inc");
let el_year = document.querySelectorAll(".year");

el_inc.addEventListener("click", () => ChangeYear("inc"));
el_dec.addEventListener("click", () => ChangeYear("dec"));
el_year.forEach(el => {
    el.innerText = year;
})

el_choosen_date.addEventListener("input", function () {
    let value = this.value.trim();
    let el_date_list = document.getElementById("date_list").children;

    if (value === "") {
        date = "";
        month = "";
        el_event.innerHTML = "";
        el_countdown.innerHTML = "";
        clearInterval(x);
    } else {
        let [check_date, check_month] = value.split(" ");
        const valid_months = {
            "JAN": 31, "FEB": 28, "MAR": 31, "APR": 30, "MEI": 31, "JUN": 30,
            "JUL": 31, "AGU": 31, "SEP": 30, "OKT": 31, "NOV": 30, "DES": 31
        };

        if (check_month && check_month.length >= 3 && !valid_months[check_month.slice(0, 3).toUpperCase()]) {
            el_event.innerHTML = "Nama bulan salah".toUpperCase();
            el_countdown.innerHTML = "Sepertinya nama bulan salah.";
            clearInterval(x);
            return;
        }

        if (check_date && check_month) {
            let max_date = valid_months[check_month.toUpperCase()];
            if (parseInt(check_date) > max_date || parseInt(check_date) <= 0) {
                el_event.innerHTML = "Tanggal salah".toUpperCase();
                el_countdown.innerHTML = "Sepertinya tanggal salah.";
                clearInterval(x);
                return;
            }
        }

        let found = Array.from(el_date_list).find(option => option.value === value);
        if (found || (value.split(" ").length === 2 && value.split(" ")[1].length >= 3)) {
            el_event.innerHTML = found ? found.label.toUpperCase() : value.toUpperCase() + " " + year;
            date = value.split(" ")[0];
            month = value.split(" ")[1].slice(0, 3);
            const month_mappings = {
                "MEI": "May",
                "AGU": "Aug",
                "OKT": "Oct",
                "DES": "Dec"
            };
            month = month_mappings[month.toUpperCase()] || month;
            CountDown(date, month, year);
        }
    }
});

function UpdateYear(year) {
    year = year;
    el_year.forEach(el => {
        el.innerText = year;
    });
    el_event.innerHTML = `${el_event.innerHTML.split(" ")[0]} ${el_event.innerHTML.split(" ")[1]} ${year}`
}

function ChangeYear(action) {
    action === "inc" ? year++ : year--;
    UpdateYear(year);
    if (date && month) {
        clearInterval(x);
        CountDown(date, month, year);
    }
}

function CountDown(date, month, year) {
    clearInterval(x);
    if (!date || !month) return;
    let countdown = new Date(month + " " + date + "," + year + " 00:00:00").getTime();
    x = setInterval(function () {
        let now = new Date().getTime();
        let distance = countdown - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        el_countdown.innerHTML = `${days} <font size="2">hari</font>  ${hours} <font size="2">jam</font>  ${minutes} <font size="2">menit</font>  ${seconds} <font size="2">detik</font>`;
        if (distance < 0) {
            clearInterval(x);
            el_countdown.innerHTML = "Oops, hari spesialnya telah berlalu. ~";
        }
    }, 1000);
}