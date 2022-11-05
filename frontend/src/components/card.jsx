import { Box, Center, Flex,  useColorModeValue} from '@chakra-ui/react';

const Card = (props) =>{
    const object = props.object;
    return (           
        <div>           
            <Center py={1}>           
                <Box
                    maxW={'190px'}
                    minH={'80px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}
                    >                
                    <p>{object.title}</p>
                {/* <Flex justify={'center'} mt={-12} color="blue">
                    
                </Flex> */}
                </Box>
            </Center>
        </div>
        
    );
}
export default Card;