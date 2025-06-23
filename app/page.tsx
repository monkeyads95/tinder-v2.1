export default function Home() {
  const [currentStep, setCurrentStep] = useState("landing");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [lastTinderUse, setLastTinderUse] = useState("");
  const [cityChange, setCityChange] = useState(false);
  const [selectedAgeRange, setSelectedAgeRange] = useState([18, 30]);

  // 💡 Correção: atribuir a expressão lógica a uma variável
  const isFormValid =
    phoneNumber.length >= 10 &&
    selectedGender &&
    profilePhoto &&
    lastTinderUse &&
    cityChange &&
    selectedAgeRange;

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Global Progress Bar - Mobile Optimized */}
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <ProgressBar step={currentStep} />
        </div>
      )}
      <MainContent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
        lastTinderUse={lastTinderUse}
        setLastTinderUse={setLastTinderUse}
        cityChange={cityChange}
        setCityChange={setCityChange}
        selectedAgeRange={selectedAgeRange}
        setSelectedAgeRange={setSelectedAgeRange}
      />
    </div>
  );
}
