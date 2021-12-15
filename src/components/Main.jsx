import React, { useContext, useEffect, useState } from "react";
import { TouchableHighlight, Image, TextInput, Text, View } from "react-native";
import styles from "../styles/Main.Style.js";
import { UserContext } from "../contexts/UserContext";
import { getGroupsByUserId } from "../utils/firestoreDatabaseUtils.jsx";
export default function Main({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("CURRENTUSER", currentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([]);
  console.log(currentUser.username);
  useEffect(() => {
    (async () => {
      const groups = await getGroupsByUserId(currentUser.username);
      console.log("GROUPS", groups);
      setGroups(groups);
    })();
  }, []);
  return (
		<View style={styles.container}>
			<Image source={require('../assets/logo.png')} style={styles.logo} />
			<TouchableHighlight
				activeOpacity={0.6}
				underlayColor='#9F4300'
				style={styles.button}
				onPress={() => {
					navigation.navigate('CreateGroup');
				}}>
				<Text style={styles.Btntext}>Create Group</Text>
			</TouchableHighlight>
			<TouchableHighlight
				activeOpacity={0.6}
				underlayColor='#9F4300'
				style={styles.button}
				onPress={() => {
					navigation.navigate('JoinGroup');
				}}>
				<Text style={styles.Btntext}>Join Group</Text>
			</TouchableHighlight>
			<Text style={styles.title}>Previous groups</Text>
			{groups.map(group => {
				return (
					<View style={styles.Groupcontainer}>
						<Image
							source={require('../assets/logo.png')}
							style={styles.avatarlogo}
						/>
						<TouchableHighlight
							key={group.groupId}
							style={styles.button}
							onPress={() => {
								navigation.navigate('Lobby', { groupPath: group.groupId });
							}}>
							<Text style={styles.GroupName}>{group.groupName}</Text>
						</TouchableHighlight>
					</View>
				);
			})}
		</View>
	);
}
