import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import './CreateTarget.css';

const CreateTarget = (props) => {
    const [targetName, setTargetName] = useState('');
    const [targetSlug, setTargetSlug] = useState('');
    const [targetRegion, setTargetRegion] = useState('us-east-2');

    const click = props.cb;

    const buttonClick = () => {
        if (targetName.length > 0 && targetSlug.length > 0) {
            click(targetName, targetSlug, targetRegion);
            setTargetName('');
            setTargetSlug('');
            setTargetRegion('us-east-2')
        }
    }

    return (
        <Card className="c-createTarget">
            <h1>New Target</h1>
            <Input type="text" name="targetName" value={targetName} placeholder="Target Name" 
                onChange={(e) => setTargetName(e.target.value)} />
            <Input type="text" name="targetSlug" value={targetSlug} placeholder="Target Slug" 
                onChange={(e) => setTargetSlug(e.target.value)} />
            <Select name="targetRegion" id="targetRegion" value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}>
                <MenuItem value="us-east-1" selected>US East (N. Virginia)</MenuItem>
                <MenuItem value="us-east-2">US East (Ohio)</MenuItem>
                <MenuItem value="us-west-1">US West (N. California)</MenuItem>
                <MenuItem value="us-west-2">US West (Oregon)</MenuItem>
                <MenuItem value="ap-south-1">Asia Pacific (Mumbai)</MenuItem>
                <MenuItem value="ap-northeast-2">Asia Pacific (Seoul)</MenuItem>
                <MenuItem value="ap-southeast-1">Asia Pacific (Singapore)</MenuItem>
                <MenuItem value="ap-southeast-2">Asia Pacific (Sydney)</MenuItem>
                <MenuItem value="ap-northeast-1">Asia Pacific (Tokyo)</MenuItem>
                <MenuItem value="ca-central-1">Canada (Central)</MenuItem>
                <MenuItem value="eu-central-1">EU (Frankfurt)</MenuItem>
                <MenuItem value="eu-west-1">EU (Ireland)</MenuItem>
                <MenuItem value="eu-west-2">EU (London)</MenuItem>
                <MenuItem value="eu-west-3">EU (Paris)</MenuItem>
            </Select>
            <Button value="Create" onClick={buttonClick}>Create</Button>
        </Card>
    );
  }
  
  export default CreateTarget;