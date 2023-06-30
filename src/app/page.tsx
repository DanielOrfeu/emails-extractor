"use client"

import Image from 'next/image'
import styles from './page.module.css'
import * as React from 'react'
import { ChakraProvider, Textarea, Text, Stack, Button, ButtonGroup, Input, HStack } from '@chakra-ui/react'
import { theme } from './styles/theme'

export default function Home() {
  const [inputText, setinputText] = React.useState<string>('');
  const [extractedEmails, setextractedEmails] = React.useState<string>('');
  const [arrobacount, setarrobacount] = React.useState<number>(0);
  
  const copyText = () => {
    let textoCopiado = document.getElementById("outputEmails") as HTMLInputElement;
    if(textoCopiado) {
      textoCopiado.select();
      textoCopiado.setSelectionRange(0, 99999)
      document.execCommand("copy");
    }
  }

  const handleInputChange = (e: { target: { value: any } }) => {
    let inputValue = e.target.value
    setinputText(inputValue)
  }
  
  const minValue = (arr: number[]):number => {
    return arr.reduce(function(acc: number, crr: number) {
        if (crr < acc && crr !== -1)
            return crr;
        return acc;
    }, Infinity); 
  }
  
  const extractEmails = (e:string) => {
      let text = e;
      let res = '';
      let removeText = 0;
      let arrobas = 0;
      
      while (text.length > 0){
          if (text.lastIndexOf('@') !== -1) {
              let findArroba = text.lastIndexOf('@');
              let sub = text.slice(0, findArroba);
  
              let domain = text.slice(findArroba)
              let arr = [
                  domain.indexOf(' '), 
                  domain.indexOf('\n'), 
                  domain.indexOf(','), 
                  domain.indexOf(';'),
                  //adicionar indexOf(0-9)
                ]
  
  
              let min = minValue(arr);
              domain = domain.slice(0,min);
              arrobas++;
  
              let ids:string[] = []
              let newLine = text[findArroba - 1] === '\n' || text[findArroba - 1] === ' '
              
              if (
                text[findArroba - (newLine ? 2 : 1)] === '}' ||
                text[findArroba - (newLine ? 2 : 1)] === ')' ||
                text[findArroba - (newLine ? 2 : 1)] === ']'
              ) { //Se @ faz parte de conjunto
                let initIDS = Math.max(
                    text.lastIndexOf('{'), 
                    text.lastIndexOf('('), 
                    text.lastIndexOf('[')
                );

                removeText = initIDS;

                let idsString = text.slice(initIDS + 1, findArroba - (newLine ? 2 : 1));

                if (idsString.indexOf(',') !== -1){
                    ids = idsString.split(',')
                } else if (idsString.indexOf(';') !== -1){
                    ids = idsString.split(';')
                } else if (idsString.indexOf('|') !== -1){
                    ids = idsString.split('|')
                } else {
                  ids = [idsString]
                }

            } else { //Se @ faz parte de individual
                let initID:number = Math.max(
                    sub.lastIndexOf(' '),
                    sub.lastIndexOf('\n'),
                    sub.lastIndexOf(','),
                    sub.lastIndexOf(';'),
                    sub.lastIndexOf('/'),
                    sub.lastIndexOf('|'),
                    sub.lastIndexOf('|'),
                );

                initID = initID === -1 ? 0 : initID
                removeText = initID;

                let id:string = sub.slice(initID);
                ids.push(id);
            }

            ids.forEach(id => res += `${res ? ', ' : ''}${id.trim()}${domain}`)
            setextractedEmails(res);
            setarrobacount(arrobas);
          } else {
            return
          }
          text = text.slice(0, removeText);
      }
  }
  
  return (
    <ChakraProvider resetCSS theme={theme}>
      <main className={styles.main}>
        <Stack w='90vw' spacing={3} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize='5xl'>Emails Extractor Tool</Text>
          <Stack w='60vw' spacing={5}>
            <Text mb='8px'>Conjunto de emais:</Text>
            <Textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder='{nome, nome_sobre, teste}@meuemail.com'
              size='md'
            />

            <Button colorScheme='teal' onClick={() => {
              extractEmails(inputText)
              setinputText('');
            }}>Extrair emails</Button>

            <Text mb='8px'>Saída:</Text>
            <Textarea
              id='outputEmails'
              onChange={() => {}}
              value={extractedEmails}
              size='md'
            />
            <Button colorScheme='teal' backgroundColor={'blue.300'} onClick={() => {
              copyText()
            }}>Copiar</Button>

            <Text mb='8px'>Arrobas extraídos (Ctrl + G)</Text>
            <Input
              w={'10vw'}
              onChange={() => {}}
              value={arrobacount}
              size='lg'
            />
          </Stack>
          
        </Stack>
      </main> 
    </ChakraProvider>
  )
}