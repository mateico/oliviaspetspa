export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/59895493845"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 transition-transform hover:scale-110"
    >
      <img
        src="/icons8-whatsapp.svg"
        alt="Chatear por WhatsApp"
        className="h-full w-full drop-shadow-lg"
      />
    </a>
  );
}
