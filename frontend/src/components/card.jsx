import { Box, Center, Flex,  useColorModeValue} from '@chakra-ui/react';

// interface NewsArticle {
//     url: string;
//     content: string;
//     asset: string;
//     published_at: Date;
//     sentiment ?: number;
//     id?: number;
// }

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
                    <a style="text-decoration:none"href={object.url}>
                        <p>{object.content}</p>
                        </a>            
                    
                {/* <Flex justify={'center'} mt={-12} color="blue">
                    
                </Flex> */}
                </Box>
            </Center>
        </div>
        
    );
}
export default Card;