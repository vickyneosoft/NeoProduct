import React, { lazy } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsScreen from '../screens/ProductsScreen'
import colors from '../constants/colors'

const ProductDetailsScreen = lazy(() => import('../screens/ProductDetailsScreen'))

const Stack = createNativeStackNavigator()

function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: colors.white,
                    headerStyle: {
                        backgroundColor: colors.red
                    },
                    headerTitleAlign: 'center'
                }}
            >
                <Stack.Screen
                    name='products'
                    component={ProductsScreen}
                    options={{
                        headerTitle: "Products"
                    }}
                />
                <Stack.Screen
                    name='productDetails'
                    component={ProductDetailsScreen}
                    options={{
                        headerTitle: "Product Details"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation
