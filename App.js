import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddModal, setIsAddModal] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoal => [...currentGoal, { id: Math.random().toString(), value: goalTitle }]);
    setIsAddModal(false);
  };

  const onDeleteHandler = (goalId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal)=> goal.id !== goalId);
    });
  };

  const onCancelHandler = () => {
    setIsAddModal(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add a New Goal" onPress={() => setIsAddModal(true)} />
      <GoalInput show={isAddModal} onCancel={onCancelHandler} addGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(dataItem) => <GoalItem id={dataItem.item.id} onDelete={onDeleteHandler} title={dataItem.item.value} />}
       />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
