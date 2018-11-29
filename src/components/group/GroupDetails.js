import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SHJPBaseCard } from '../../components/custom/cards';

const GroupDetails = ({ group }) =>
  <SHJPBaseCard>
    <View style={style.container}>
      <Text style={style.name}>{group.name}</Text>
      <Text style={style.description}>{group.description}</Text>
      {
        !group.imageUri ? null :
          <Image style={style.imagePreview} src={{uri: `data:image/png;base64,${group.imageUri}`}} />
      }
      <Text style={style.membersLabel}>Members</Text>
      {
        group.members.map((member, i) =>
          <Text style={style.member} key={i}>{member.name}</Text>)
      }
    </View>
  </SHJPBaseCard>;

const style = StyleSheet.create({
  container: {
    padding: 10
  },
  name: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  description: {
    color: '#000',
    fontSize: 14
  },
  imagePreview: {
    width: 300,
    height: 240,
    marginHorizontal: 'auto'
  },
  membersLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  },
  member: {
    color: '#000'
  }
});

export default GroupDetails;