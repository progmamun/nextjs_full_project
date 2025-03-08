const formatDateToBangla = (dateString: string): string => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const convertToBanglaDigits = (num: string): string =>
      num.replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
  
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  
    return convertToBanglaDigits(formatted);
  };
  
  export default formatDateToBangla;
  