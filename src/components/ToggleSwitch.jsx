const ToggleSwitch = ({ isDay, setIsDay }) => {
  const handleToggle = () => {
    setIsDay(!isDay)
  }

  return (
    <div
      className='relative inline-block sm:w-40 sm:h-8 h-6 w-32 transition duration-200 ease-linear border-yellow-400 border rounded-full cursor-pointer'
      onClick={handleToggle}
    >
      {/* Toggle Background */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-yellow-400 rounded-full transition-transform duration-500 transform ${
          isDay ? 'translate-x-0' : 'translate-x-full'
        }`}
      />

      {/* Text "Day" and "Week" inside toggle */}
      <div className='absolute inset-2 flex items-center justify-between px-3 text-white font-semibold'>
        <span className={`${isDay ? 'text-yellow-900' : 'text-yellow-400'}`}>
          Day
        </span>
        <span className={`${isDay ? 'text-yellow-400' : 'text-yellow-900'}`}>
          Week
        </span>
      </div>
    </div>
  )
}

export default ToggleSwitch
