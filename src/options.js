
export default function sharedOptions() {
  const nonWorkingDays = ['2022-01-01','2022-01-06','2022-04-17','2022-04-30','2022-05-02','2022-06-15','2022-08-14','2022-10-31', '2022-11-10','2022-12-24', '2022-12-25']
  return {
    locale:'pl',
    mode: "range", 
    conjunction:',',
    minDate: "today",
    ariaDateFormat: "Y-m-d",
    dateFormat: "Y-m-d",
    disable: [
     function (date) {
       const dateStr= date.toISOString().split('T')[0]
       return (date.getDay() === 0 || nonWorkingDays.includes(dateStr))
     },
    ],
    inline: true,
  }
} 