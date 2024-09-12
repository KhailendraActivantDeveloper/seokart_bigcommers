'use client'
import {updateLanguage} from '@/app/_api/action'
import { usePathname } from '@/navigation';
import {useLocale} from 'next-intl';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
const basePath = process.env.NEXT_PUBLIC_BASEPATH??""

export default function Home() {
  const localeLang = useLocale();
  const [isPending, startTranslation] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleOnchange: any = async (e:any, lung:string)=>{
    router.push(`/${lung}/${pathname}`)
  }
  return (<>
   <DropdownButton
        id="language-switcher"
        title={<><Image src={`${basePath}/images/lung-change-gloabe-icon.svg`} width={20} height={20} alt='gloabe image' /> {localeLang}</>}
        variant="secondary"
        disabled={isPending}
      >
        <Dropdown.Item onClick={(e) => handleOnchange(e,'en')}>English</Dropdown.Item>
        {/* <Dropdown.Item onClick={(e) => handleOnchange(e,'hi')}>Hindi</Dropdown.Item> */}
        <Dropdown.Item onClick={(e) => handleOnchange(e,"fr")}>French</Dropdown.Item>
        <Dropdown.Item onClick={(e) => handleOnchange(e,'es')}>Spanish</Dropdown.Item>
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