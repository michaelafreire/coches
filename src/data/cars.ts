import type { Car } from '../types/car'

type CarDetails = Omit<Car, 'image' | 'gallery'>

const carAssets = import.meta.glob<string>('../assets/C*/*.{PNG,JPG}', {
  eager: true,
  import: 'default',
})

function getImageNumber(path: string) {
  return Number(path.match(/-(\d+)\.[^.]+$/)?.[1] ?? 0)
}

function getCarImages(id: string) {
  const folder = id.toUpperCase()
  const images = Object.entries(carAssets)
    .filter(([path]) => path.includes(`/assets/${folder}/`))
    .sort(([firstPath], [secondPath]) => getImageNumber(firstPath) - getImageNumber(secondPath))
    .map(([, image]) => image)

  return {
    image: images[0] ?? '',
    gallery: images.slice(1),
  }
}

const carDetails: CarDetails[] = [
  {
    id: 'c1',
    marca: 'FORD',
    modelo: 'Focus',
    precio: '7.900',
    year: '2017',
    kilometraje: '149.600 km',
    etiquetaMedioambiental: 'c',
    cilindrada: '4',
    transmision: 'MANUAL',
    motor: '1.000 cc',
  },
  {
    id: 'c2',
    marca: 'BMW',
    modelo: 'X5',
    precio: '23.500',
    year: '2016',
    kilometraje: '148.000 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '6',
    transmision: 'AUTOMATICO',
    motor: '3.000 cc',
  },
  {
    id: 'c3',
    marca: 'MERCEDES BENZ',
    modelo: 'CLA180',
    precio: '19.900',
    year: '2019',
    kilometraje: '178.000 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '4',
    transmision: 'AUTOMATICO',
    motor: '1.800 cc',
  },
  {
    id: 'c4',
    marca: 'FERRARI',
    modelo: '430',
    precio: '135.000',
    year: '2006',
    kilometraje: '40.500 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '8',
    transmision: 'AUTOMATICO',
    motor: '1.333 cc',
  },
  {
    id: 'c5',
    marca: 'RENAULT',
    modelo: 'MASTER',
    precio: '15.900',
    year: '2018',
    kilometraje: '139.700 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '4',
    transmision: 'MANUAL',
    motor: '2.200 cc',
  },
  {
    id: 'c6',
    marca: 'PORSCHE',
    modelo: 'CAYMAN',
    precio: '31.500',
    year: '2008',
    kilometraje: '57.500 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '6',
    transmision: 'AUTOMATICO',
    motor: '2.700 cc',
  },
  {
    id: 'c7',
    marca: 'BMW',
    modelo: '116D',
    precio: '8.500',
    year: '2012',
    kilometraje: '171.300 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '4',
    transmision: 'MANUAL',
    motor: '2.000 cc',
  },
  {
    id: 'c8',
    marca: 'MERCEDES BENZ',
    modelo: 'A180',
    precio: '13.500',
    year: '2012',
    kilometraje: '110.000 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '4',
    transmision: 'MANUAL',
    motor: '1.600 cc',
  },
  {
    id: 'c9',
    marca: 'MERCEDES BENZ',
    modelo: 'B180',
    precio: '12.500',
    year: '2012',
    kilometraje: '155.000 km',
    etiquetaMedioambiental: 'C',
    cilindrada: '4',
    transmision: 'MANUAL',
    motor: '1.600 cc',
  },
]

export const cars: Car[] = carDetails.map((car) => ({
  ...car,
  ...getCarImages(car.id),
}))
