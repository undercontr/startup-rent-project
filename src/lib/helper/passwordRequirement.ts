export default function passwordRequirement(password) {
    if (password.legngth <= 8) {
        return {success: false, message: "Şifreniz 8 karakter veya 8 karakterden uzun olmalıdır."}
    } else {
        return {success: true};
    }
}