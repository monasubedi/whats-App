import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import userProfile from '../assets/images/profile.jpeg'
import colors from '../constants/colors'
import { FontAwesome } from '@expo/vector-icons'
import { launchImagePicker, uploadImageAsync } from '../utils/ImagePickerHelper'
import { updateSignedInData } from '../utils/actions/authActions'
import { updateLoggedInUserData } from '../store/authSlice'
import { useDispatch } from 'react-redux'

const ProfileImage = (props) => {
    const sourceUri = props.uri ? { uri: props.uri } : userProfile;
    const [image, setImage] = useState(sourceUri);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const showEditButton = props.showEditButton && props.showEditButton === true;

    const Container = showEditButton ? TouchableOpacity : View;

    const pickImage = async () => {
        try {
            let uri = await launchImagePicker();
            if (!uri) return null;
            setIsLoading(true);
            const imageUrl = await uploadImageAsync(uri);
            if (!imageUrl) throw new Error("Could not upload image");
            const newData = { profilePicture: imageUrl }
            setIsLoading(false);
            await updateSignedInData(props.userId, newData);
            dispatch(updateLoggedInUserData({ newData }));

            setImage({ uri: imageUrl });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }

    }

    return (
        <Container onPress={pickImage}>
            {
                isLoading ? <View height={props.size} width={props.size} style={styles.center}><ActivityIndicator size={'small'} color={colors.primary} /></View> :
                    <Image alt='profile-img' style={{ ...styles.image, ...{ width: props.size, height: props.size } }} source={image} />

            }
            {
                showEditButton && !isLoading &&
                <View style={styles.editIcon}>
                    <FontAwesome name='pencil' />
                </View>
            }


        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.lightGrey

    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: colors.lightGrey,
        borderRadius: 20,
        padding: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default ProfileImage

