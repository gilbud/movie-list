import { useState } from 'react'
import CardMovie from '../components/cardMovie'
import Slider from '../components/slider/Slider'
import ToggleSwitch from '../components/ToggleSwitch'

const HomePage = () => {
  const [isDay, setIsDay] = useState(true)

  return (
    <div className='bg-black min-h-screen flex flex-col gap-10'>
      <Slider />

      <div className='flex sm:justify-center -mb-[72px] z-20 justify-end mr-5'>
        <ToggleSwitch isDay={isDay} setIsDay={setIsDay} />
      </div>

      <CardMovie
        headingTitle='Trending Movie'
        url={isDay ? '/trending/movie/day' : '/trending/movie/week'}
      />

      <CardMovie headingTitle='Popular Movie' url='/movie/popular' />
      <CardMovie headingTitle='Upcoming Movie' url='/movie/upcoming' />
    </div>
  )
}

export default HomePage
