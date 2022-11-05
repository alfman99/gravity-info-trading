import { Box, Center, Flex,  useColorModeValue} from '@chakra-ui/react';

// interface NewsArticle {
//     url: string;
//     content: string;
//     asset: string;
//     published_at: Date;
//     sentiment ?: number;
//     id?: number;
// }

const Card = ({ newsArticle }) =>{
    return (           
        <div>           
            <Center py={1}>           
                <Box
                    maxH={'10em'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}
                    margin={2}
                    padding={2}
                    >    
                    <a href={newsArticle.url}>
                      <p style={{
                        textOverflow: 'ellipsis',
                      }}>{newsArticle.content}</p>
                    </a>
                </Box>
            </Center>
        </div>
        
    );
}
export default Card;