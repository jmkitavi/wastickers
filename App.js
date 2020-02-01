import React, {
  Component
} from 'react'
import {
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native'
import WhatsappStickers from 'react-native-whatsapp-stickers-android'

const Button = props => (
  <View
    style={{
      alignItems: 'center',
      backgroundColor: '#5998ff',
      padding: 15,
      margin: 10,
      marginBottom: 5,
      borderRadius: 4,
      flexBasis: 300,
      flexGrow: 1,
    }}
    {...props}
  >
    <Text>
      {props.children}
    </Text>
  </View>
)

const Stickers = ({ children: stickers }) => (
  stickers.map(sticker =>
    <View
      key={sticker.imageFileName}
      style={{
        backgroundColor: '#e6ecef',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        flexBasis: 100,
        flexShrink: 1,
        margin: 10,
      }}
    >
      <Image
        source={{ uri: `asset:/cup/${sticker.imageFileName}`}}
        style={{
          height: 96,
          width: 96,
        }}
        resizeMode="contain"
      />
    </View>
  )
)

class App extends Component {
  state = {
    installed: null,
    stickers: [],
    stickers2: [],
  }

  componentDidMount = () => {
    WhatsappStickers.isStickerPackInstalled('cup')
      .then((installed) => {
        this.setState({ installed })
      })
      .catch((error) => {
        console.error(error)
      })
    
    WhatsappStickers.fetchStickerPacks()
      .then((stickerPackList) => {
        console.log('stickerPackList HAPA', stickerPackList)
        let firstStickerPack = stickerPackList[0]
        let secondStickerPack = stickerPackList[1] //
        this.setState({ stickers: firstStickerPack.stickers })
        this.setState({ stickers2: secondStickerPack.stickers }) //
      })
      .catch((error) => {
        console.error(error)
      })
  }
  
  render() {
    const { installed, stickers, stickers2 } = this.state
    return (
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}
      >
        {
          installed === null
            ? <Text>
                Loading...
              </Text>
            : (
              !installed &&
                <Button
                  onTouchStart={() => {
                    let identifier = 'cup'
                    let name = 'test sticker pack'
                
                    WhatsappStickers.addStickerPack(identifier, name)
                      .then(() => {
                        this.setState({ installed: true })
                      })
                      .catch((error) => {
                        console.warn(error)
                      })
                  }}
                >
                  Add sticker pack
                </Button>
            )
        }
        <Stickers>
          {stickers}
        </Stickers>

        <Text>Stickers 2 </Text>

        <Stickers>
          {stickers2}
        </Stickers>
      </ScrollView>
    )
  }
}

export default App
