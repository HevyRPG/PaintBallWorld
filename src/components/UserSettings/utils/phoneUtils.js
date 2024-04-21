export const formatPhone = (input) => {

  let digits = input.replace(/\D/g, "");

 
  if (digits.length > 9) {
    digits = digits.slice(0, 9);
  }

 
  if (digits.length > 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length > 3) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else {
    return digits;
  }
};

export const handlePhoneChange = (e, setPhone, setPhoneError) => {
  const formattedPhone = formatPhone(e.target.value);
  setPhone(formattedPhone);

  const phoneRegex = /^[0-9]{9}$/;
  if (!phoneRegex.test(formattedPhone.replace(/-/g, ""))) {
    setPhoneError("Numer telefonu musi mieć dokładnie 9 cyfr.");
  } else {
    setPhoneError(null);
  }
};
