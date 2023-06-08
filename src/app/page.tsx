"use client"

import Image from 'next/image'
import styles from './page.module.css'
import * as React from 'react'
import { ChakraProvider, Textarea, Text, Stack, Button, ButtonGroup } from '@chakra-ui/react'

export default function Home() {

  let [value, setValue] = React.useState<string>('')
  let [converted, setConverted] = React.useState<string>('')

  const handleInputChange = (e: { target: { value: any } }) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  const minValue = (arr: number[]):number => {
    return arr.reduce(function(acc: number, crr: number) {
      if (crr < acc && crr !== -1)
        return crr;
      return acc;
    }, Infinity);
  }
  const convertEmails = (e: string) => {
    let text = e
    let result = ''
    if (e) {
      while (text.length > 0) {
        if (text.includes('@')) {

          let init = Math.max(
            text.lastIndexOf('{'), 
            text.lastIndexOf('('), 
            text.lastIndexOf('[')
          );
          let str = text.slice(init);
          if (str.lastIndexOf('@')) {

            let domain = str.slice(str.lastIndexOf('@'));
            console.log('domain', domain)
            let arr = [
              domain.indexOf(' '), 
              domain.indexOf('\n'), 
              domain.indexOf(','), 
              domain.indexOf(';')
            ]

            let min = minValue(arr);
            console.log('min', min)

            domain = domain.slice(0,min);

            console.log('domain2', domain)


            // if (left.lastIndexOf(`,`)){
            //   left = left.slice(0, left.lastIndexOf(','))
            // } else if ( left.lastIndexOf(';') ){
            //   left = left.slice(0, left.lastIndexOf(';'))
            // }
            
            let ids = str.slice(1, str.lastIndexOf('@') - 1);
            ids.split(',').map(id => result += `${result ? ', ' : ''}${id.trim()}${domain}`)
    
            setConverted(result)
           text = text.substring(0, init)

          }
        } else {
          text = ''
        }
      }
    }
  }
  
  return (
    <ChakraProvider>
      <main className={styles.main}>
        <Stack w='90vw' spacing={3} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize='5xl'>Email formatter</Text>
          <Stack w='60vw' spacing={5}>
          <Text mb='8px'>Conjunto de emais:</Text>
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder='{nome, nome_sobre, teste}@meuemail.com'
            size='lg'
          />
          <Button colorScheme='teal' onClick={() => {
            convertEmails(value)
          }}>Converter</Button>

          <Text mb='8px'>Saída:</Text>
          <Textarea
            onChange={() => {}}
            value={converted}
            size='lg'
          />
          </Stack>
          
        </Stack>
      </main> 
    </ChakraProvider>
  )
}


/*
[daniel_yago, torres.gomes, luca.leonardo]@gmail.com; {daniel_yago, torres.gomes, luca.leonardo}@edu.com.br ✅

{daniel_yago, torres.gomes, luca.leonardo}@edu.com.br ✅

[daniel_yago, torres.gomes, luca.leonardo]@gmail.com são os emails ✅

(daniel_yago,luca.leonardo, torres.gomes)@hotmail.com ✅

[daniel_yago, torres.gomes, luca.leonardo]@gmail.com, {daniel_yago, torres.gomes, luca.leonardo}@edu.com.br ✅

uc´ıola Alves Magalhaes, Daniela Maciel Pinto ˜
1Empresa Brasileira de Pesquisa Agropecuaria (Embrapa) ´
Soldado Passarinho 303, Fazenda Chapadao – Campinas – SP – Brasil ˜
{jaudete.daltio, andre.farias,
luciola.magalhaes, daniela.maciel}@embrapa.br
Abstract. Desertification is the land-degradation process that occurs in arid,
semi-arid, and dry sub-humid zones as a result of the joint action of natural
source and anthropic factors. In Brazil, most of the susceptible areas are located
in the Caatinga biome. This paper presents a data platform for character  ✅

Camila D. Cabral1
, Rafael F. de Lima2
, Lucas Eduardo de O. Aparecido1
, Fábio 
dos S. Corsini3
, Geraldo G. de O. Júnior4 
1Departamento Agronomia – Instituto Federal do Sul de Minas Gerais campus 
Muzambinho (IFSULDEMINAS) – Muzambinho – MG – Brasil 
camilacabralagro@gmail.com, lucas.aparecido@muz.ifsuldeminas.edu.br 
2Departamento Agronomia – Instituto Federal do Mato Grosso do Sul campus Naviraí 
(IFMS) – Naviraí – MS – Brasil
rafael.lima2@estudante.ifms.edu.br 
3Departamento Computação – Instituto Federal do Sul de Minas Gerais campus 

2Empresa Brasileira de Pesquisa Agropecuaria (EMBRAPA – CPPSUL) ´
Bage – RS – Brasil ´
{samaramarques.aluno,alinelisboa.aluno,ericoamaral}
@unipampa.edu.br, vinicius.lampert@embrapa.br
Abstract. This paper addresses the compliance process of the General Data

eral do Sul de Minas (IFSULDEMINAS)
Muzambinho – MG - Brazil
joao.lorencone@estudante.ifms.edu.br,
lucas.aparecido@muz.ifsuldeminas.edu.br,
pedro.lorencone@estudante.ifms.edu.br, 
guilherme.torsoni.ifms.edu.br
Abstract. This study aimed to perform the agricultural zoning of cl

l
vinilopes03@discente.ufg.br, roberto.oliveira@ueg.br, valdemarneto@ufg.br
Abstract. Internet of Things (IoT) is a prominent technology in which everyda


deral do Espírito Santo (Ifes) – Campus Itapina
Rodovia BR-259, Km 70, Colatina-ES, Brasil
julionardi@ifes.edu.br, vitornicchioalves@gmail.com,
junior_recla@hotmail.com, {fabianoruy, robson.posse}@ifes.edu.br 
Abstract. Solutions of Internet-of-Things in Agriculture deal with devices an

Brasil
eaa@discente.ifpe.edu.br, humberto.junior@garanhuns.ifpe.edu.br, 
cosmo.rufino@afogados.ifpe.edu.br, fabio.marques@ifal.edu.br,
pablo.radames@ifpa.edu.br
Abstract. The moisture content present in seeds pl

eira de Pesquisa Agropecuária – Embrapa, Juiz de Fora, MG – Brazil
jonas.gomes@estudante.ufjf.br, {jose.david, 
regina.braga}@ufjf.edu.br, bryan.barbosa@ice.ufjf.br, 
{wagner.arbex, wneiton.gomes, leonardo.gravina}@embrapa.br
Abstract. This work presents a systematic mapping related to Decision Suppor

ge, RS – Brasil ´
kim.moreles@hotmail.com, vinicius.lampert@embrapa.br
erico.amaral@unipampa.edu.br
Abstract. The demand for sustainability assessments of agricultural systems
has been growing in recent years. Based on a specific method

il
nsc.rodolfo@gmail.com, monicagiponi@gmail.com, 
wellington.moreira@ifsudestemg.edu.br, vania.xavier@ifsudestemg.edu.br
Resumo. O Manejo Integrado de Pragas (MIP) é uma ferramenta qu

s, SP
{maria.fasiaben; stanley.oliveira; andre.moraes}@embrapa.br, 
{maxwell.almeida; octavio.oliveira}@ibge.gov.br, gabeusebio@gmail.com
Abstract. The objective of this work is to typify beef cattle producing

Brasil
alexandre.donizeti@ufabc.edu.br
Abstract. This article aims to present a bibliometric analysis of the scientific
production of authors linked to EMBRAPA considering the article

*/