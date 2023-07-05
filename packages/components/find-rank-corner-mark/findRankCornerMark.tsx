import styled from '@emotion/native';

const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: 27,
  height: 27,
  position: 'absolute',
});

const RankIconImageView = styled.Image({
  width: 27,
  height: 27,
  position: 'absolute',
  left: 0,
  top: 0,
});

const RankLabel = styled.Text({
  fontSize: 15,
  transform: [{translateX: -1.5}, {translateY: -1.5}],
  fontWeight: 'bold',
  color: '#FFFFFF',
});

const RankIcons = [
  require('@/resource/find_rank_icon_new_1.png'),
  require('@/resource/find_rank_icon_new_2.png'),
  require('@/resource/find_rank_icon_new_3.png'),
  require('@/resource/find_rank_icon_new_4.png'),
];

const FindRankCornerMark = (props: {pos: number}) => {
  let rankBackImageIndex = props.pos < 4 ? props.pos + 1 : 4;
  return (
    <Container>
      <RankIconImageView source={RankIcons[rankBackImageIndex - 1]} />
      <RankLabel>{props.pos + 1}</RankLabel>
    </Container>
  );
};

export default FindRankCornerMark;
