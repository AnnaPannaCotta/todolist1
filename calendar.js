document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("datePicker");
    const button = document.getElementById("openCalendar");

    const calendar = flatpickr(dateInput, {
        dateFormat: "Y-m-d",
        appendTo: document.main,
        onClose: function () {
            console.log("Вибрана дата:", dateInput.value);
        }
    });

    button.addEventListener("click", function () {
        calendar.open();
    });
});