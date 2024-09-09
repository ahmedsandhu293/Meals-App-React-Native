import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";

import { MEALS } from "../data/dummy-data";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

import MealDetail from "../components/MealDetail";
import Subtitle from "../components/MealDetaill/Subtitle";
import List from "../components/MealDetaill/List";
import IconButton from "../components/IconButton";

const MealDetailScreen = ({ route, navigation }) => {
  //const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const mealId = route.params.mealId;

  const mealIsFavorite = favoriteMealIds.includes(mealId);
  const dispatch = useDispatch();

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      //favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      //favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={changeFavoriteStatusHandler}
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View>
        <MealDetail
          affordability={selectedMeal.affordability}
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listInnerContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listInnerContainer: {
    width: "80%",
  },
});
