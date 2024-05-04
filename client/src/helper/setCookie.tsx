export default function SetCookie(name: string, value: string, minutes: number) {
    const d = new Date();
    d.setTime(d.getTime() + minutes * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
  }