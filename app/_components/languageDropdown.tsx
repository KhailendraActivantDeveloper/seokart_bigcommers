'use client'
import {updateLanguage} from '@/app/_api/action'
import { useLocale } from '@/context/LocaleContext';
import Image from 'next/image';
import { useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
const basePath = process.env.NEXT_PUBLIC_BASEPATH??""

export default function Home() {
  const { locale, setLocale } = useLocale();


  const handleOnchange = async (e:any, lung:string)=>{
    e.preventDefault();
     updateLanguage(lung)
  }
  useEffect(()=>{
    async function fn() {
      const simulatedEvent = { preventDefault: () => {} };
      await handleOnchange(simulatedEvent, '');
    }
    fn()
  },[]);
  return (<>
   <DropdownButton
        id="language-switcher"
        title={<><Image src={`${basePath}/images/lung-change-gloabe-icon.svg`} width={20} height={20} alt='gloabe image' /> {locale}</>}
        variant="secondary"
      >
        <Dropdown.Item onClick={(e) => setLocale('en')}>English</Dropdown.Item>
        {/* <Dropdown.Item onClick={(e) => handleOnchange(e,'hi')}>Hindi</Dropdown.Item> */}
        <Dropdown.Item onClick={(e) => setLocale('fr')}>French</Dropdown.Item>
        <Dropdown.Item onClick={(e) => setLocale('es')}>Spanish</Dropdown.Item>
        {/* <Dropdown.Item onClick={(e) => handleOnchange(e,'de')}>German</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'ru')}>Russian</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'pt')}>Portuguese</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'ja')}>Japanese</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'it')}>Italian</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'cn')}>Simplified Chinese</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'tw')}>Traditional Chinese</Dropdown.Item> */}
      </DropdownButton>
  </>)
}