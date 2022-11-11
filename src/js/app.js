import debounce from "debounce";
import getRef from "./utils/get-ref";
class App {
  constructor() {
    this.speech = window.speechSynthesis;
    this.voices = [];

    this.dropdown = getRef("voices");
    this.text = getRef("text");
    this.pitch = getRef("pitch");
    this.rate = getRef("rate");
    this.form = getRef("form");

    this.init();
    this.onTextChanged = debounce(this.onTextChanged, 250);
  }

  init() {
    this.setVoices();

    this.speech.addEventListener("voiceschanged", () => this.setVoices());
    this.form.addEventListener("submit", (e) => this.onSubmit(e));

    this.text.addEventListener("input", () => this.onTextChanged());
    this.dropdown.addEventListener("change", () => this.update());
    this.pitch.addEventListener("change", () => this.update());
    this.rate.addEventListener("change", () => this.update());
  }

  prefill() {
    const {
      location: { search },
    } = window;
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    const options = {
      ...{
        voice: "Google español",
        rate: 1,
        pitch: 1,
        text: "Ik wil graag een bier, por favour",
      },
      ...searchParams,
    };

    this.dropdown.value = options.voice;
    this.text.value = options.text;
    this.pitch.value = options.pitch;
    this.rate.value = options.rate;
  }

  setVoices() {
    this.voices = this.speech.getVoices();

    this.dropdown.innerHTML = this.voices.reduce(
      (str, { name }) => `
			${str}
			<option value="${name}">${name}</option>
		`,
      ""
    );

    this.prefill();
  }

  onSubmit(e) {
    e.preventDefault();

    this.update();
  }

  onTextChanged() {
    this.update();
  }

  update() {
    this.speak();
    this.updateURL();
  }

  speak() {
    const voice = this.voices.find(({ name }) => name === this.dropdown.value);
    const { lang } = voice;
    const utterance = new SpeechSynthesisUtterance();

    this.speech.cancel();

    utterance.voice = voice;
    utterance.lang = lang;
    utterance.text = this.text.value;
    utterance.rate = this.rate.value;
    utterance.pitch = this.pitch.value;
    utterance.volume = 2;

    this.speech.speak(utterance);
  }

  updateURL() {
    const queryString = new URLSearchParams(new FormData(this.form)).toString();

    history.replaceState(null, document.title, `?${queryString}`);
  }
}

export default new App();
