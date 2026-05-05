const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');

const dayOutput = document.getElementById('day-output');
const monthOutput = document.getElementById('month-output');
const yearOutput = document.getElementById('year-output');

const dayError = document.getElementById('day-error');
const monthError = document.getElementById('month-error');
const yearError = document.getElementById('year-error');

const submitBtn = document.getElementById('submit');

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getMaxDays(month, year) {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }
    return 31;
}

submitBtn.addEventListener('click', () => {

    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";

    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();

    if (dayValue === "" || monthValue === "" || yearValue === "") {
        if (dayValue === "") dayError.textContent = "Required";
        if (monthValue === "") monthError.textContent = "Required";
        if (yearValue === "") yearError.textContent = "Required";
        return;
    }

    const day = Number(dayValue);
    const month = Number(monthValue);
    const year = Number(yearValue);

    if (year <= 0) {
        yearError.textContent = "Invalid year";
        return;
    }

    if (month < 1 || month > 12) {
        monthError.textContent = "Invalid month";
        return;
    }

    const maxDays = getMaxDays(month, year);

    if (day < 1 || day > maxDays) {
        dayError.textContent = "Invalid day";
        return;
    }

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (
        year > currentYear ||
        (year === currentYear && month > currentMonth) ||
        (year === currentYear && month === currentMonth && day > currentDay)
    ) {
        dayError.textContent = "Date cannot be in the future";
        return;
    }

    let ageYear = currentYear - year;
    let ageMonth = currentMonth - month;
    let ageDay = currentDay - day;

    if (ageDay < 0) {
        ageMonth--;
        const prevMonthDays = getMaxDays(
            currentMonth === 1 ? 12 : currentMonth - 1,
            currentMonth === 1 ? currentYear - 1 : currentYear
        );
        ageDay += prevMonthDays;
    }

    if (ageMonth < 0) {
        ageYear--;
        ageMonth += 12;
    }

    dayOutput.textContent = ageDay;
    monthOutput.textContent = ageMonth;
    yearOutput.textContent = ageYear;
});
